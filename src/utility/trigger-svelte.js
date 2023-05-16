import {onDestroy, onMount} from "svelte"

class TriggerEventHandler {
    #event = null
    args = []
    callback = null
    once = false
    #priority = 0
    
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
    
    cancel() {
        Trigger.cancelHandler(this)
        this.#event = null
    }
    
    execute(...args) {
        this.callback(...this.args, ...args)
    }
    
    setPriority(priority) {
        this.#priority = priority
        Trigger.updatePriorities(this.#event)
        return this
    }
    
    getPriority() {
        return this.#priority
    }
}

const Trigger = Object.assign(function(event, ...args) {
    Trigger._processHandlers(event, args)
    
}, {
    _handlers : new Map(),
    
    _executing : false,
    _executionQueue : [],
    
    _prioritiesUsed : false,
    
    _executeQueue() {
        if (this._executing)
            return
        
        this._executing = true
        
        let nextElement = null
        
        while (nextElement = this._executionQueue.shift()) {
            const [handler, args] = nextElement
            handler.execute(...args)
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
    
    _processHandlers(event, args) {
        const handlers = this._handlers.get(event)
        if (handlers)
            for (let handler of handlers) {
                if (handler.once)
                    this.cancelHandler(handler)
                handler.execute(...args)
            }
    },
    
    attachHandler(handler) {
        const event = handler.getEvent()
        const eventHandlers = this._handlers.get(event) ?? []
        eventHandlers.push(handler)
        if (this._prioritiesUsed)
            this.updatePriorities(handler)
        this._handlers.set(event, eventHandlers)
    },
    
    cancelHandler(handler) {
        this._removeFromQueue(handler)
        
        const event = handler.getEvent()
        const eventHandlers = this._handlers.get(event)
        this._handlers.set(event, eventHandlers.filter(x => x !== handler))
    },
    
    createEventHandler (event, callback, ...args) {
        const handler = new TriggerEventHandler(event, callback, args)
        this.attachHandler(handler)
        return handler
    },
    
    updatePriorities(event) {
        this._prioritiesUsed = true
        const handlers = this._handlers.get(event) ?? []
        handlers.sort((x, y) => x.getPriority() - y.getPriority())
    },
    
    on(event, callback, ...args) {
        const promise = new Promise(resolve => {
            let handler = null
    
            onMount(() => {
                handler = this.createEventHandler(event, callback, ...args)
                resolve(handler)
            })
    
            onDestroy(() => {
                handler?.cancel?.()
            })
        })
        
        promise.setPriority = (priority) => promise.then(x => x.setPriority(priority))
        
        return promise
    },
    
    async once (event, callback, ...args) {
        const handler = await this.on(event, callback, ...args)
        handler.once = true
        return handler
    },
    
})

export default Trigger
