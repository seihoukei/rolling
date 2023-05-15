const TRIGGER_MODES = {
    NOW : '_executeNow',
    NEXT : '_executeNext',
    QUEUE : '_queue',
    ASYNC : '_executeAsync',
}

class TriggerEventHandler {
    #event = null
    #mode = null
    args = []
    callback = null
    once = false
    
    constructor(event = null, callback = null, args = []) {
        if (event === null) {
            throw new Error("Trigger can't have empty event")
        }
        if (callback === null) {
            throw new Error("Trigger can't have empty callback")
        }
        
        this.#event = event
        this.callback = callback
        this.args = args
    }
    
    getEvent() {
        return this.#event
    }
    
    setMode(value) {
        const valid = Object.values(Trigger.MODES).includes(value)
    
        if (!valid)
            throw new Error(`Invalid trigger mode ${value}`)
    
        this.#mode = value
        
        return this
    }
    
    getMode() {
        return this.#mode
    }
    
    cancel() {
        Trigger.cancelHandler(this)
        this.#event = null
    }
    
    reattach(event = this.#event) {
        Trigger.cancelHandler(this)
        this.#event = event
        Trigger.attachHandler(this)
        return this
    }
    
    execute(args) {
        this.callback(...this.args, ...args)
    }
}

const Trigger = Object.assign(function(event, ...args) {
    Trigger._processHandlers(Trigger._mode, event, args)
    
}, {
    _handlers : new Map(),
    
    _executing : false,
    _executionQueue : [],
    
    MODES : TRIGGER_MODES,
    
    _mode : TRIGGER_MODES.NOW,
    
    _executeQueue() {
        if (this._executing)
            return
        
        this._executing = true
        
        let nextElement = null
        
        while (nextElement = this._executionQueue.shift()) {
            const [handler, args] = nextElement
            handler.execute(args)
        }
        
        this._executing = false
    },
    
    _removeFromQueue(handler) {
        this._executionQueue = this._executionQueue.filter(element => element.handler !== handler)
    },
    
    _queue(handler, args) {
        this._executionQueue.push([handler, args])
        this._executeQueue()
    },
    
    _executeNext(handler, args) {
        this._executionQueue.unshift([handler, args])
        this._executeQueue()
    },
    
    _executeNow(handler, args) {
        handler.execute(args)
    },
    
    _executeAsync(handler, args) {
        setTimeout(handler.execute.bind(handler, args),0)
    },
    
    _processHandlers(method, event, args) {
        const handlers = this._handlers.get(event)
        if (handlers)
        for (let handler of handlers) {
            if (handler.once)
                this.cancelHandler(handler)
            this[handler.getMode() ?? method](handler, args)
        }
    },
    
    attachHandler(handler) {
        const event = handler.getEvent()
        const eventHandlers = this._handlers.get(event) ?? new Set()
        eventHandlers.add(handler)
        this._handlers.set(event, eventHandlers)
    },
    
    cancelHandler(handler) {
        this._removeFromQueue(handler)
    
        const event = handler.getEvent()
        const eventHandlers = this._handlers.get(event)
        eventHandlers?.delete(handler)
    },
    
    on (event, callback, ...args) {
        const handler = new TriggerEventHandler(event, callback, args)
        this.attachHandler(handler)
        return handler
    },
    
    once (event, callback, ...args) {
        const handler = this.on(event, callback, ...args)
        handler.once = true
        return handler
    },
    
    now (event, ...args) {
        this._processHandlers(this.MODES.NOW, event, args)
    },
    
    next (event, ...args) {
        this._processHandlers(this.MODES.NEXT, event, args)
    },
    
    queue (event, ...args) {
        this._processHandlers(this.MODES.QUEUE, event, args)
    },
    
    async (event, ...args) {
        this._processHandlers(this.MODES.ASYNC, event, args)
    },
    
    createTrigger(...fixedArgs) {
      const trigger = function(...args) {Trigger(trigger, ...fixedArgs, ...args)}
      return trigger
    },
    
    createTriggers(...names) {
        const result = {}
        names.forEach(name => result[name] = this.createTrigger())
        return result
    },
    
    ify(base, ...names) {
        let result = base

        names.forEach(name => {
            const oldFunc = base[name].bind(base)
            if (typeof oldFunc !== "function")
                throw new Error ("Trigger can only triggerify functions")
            
            const newFunc = function(...args) {
                oldFunc.apply(this, args)
                Trigger(newFunc, ...args)
            }
    
            base[name] = newFunc
        })
        
        return result
    },
    
})

Object.defineProperty(Trigger, "mode", {
    set (value) {
        const valid = Object.values(this.MODES).includes(value)
        
        if (!valid)
            throw new Error(`Invalid trigger mode ${value}`)
        
        this._mode = value
    },
    
    get () {
        return this._mode
    },
})

export default Trigger
