import {onDestroy, onMount} from "svelte"

class TriggerEventHandler {
    #event = null
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
    
    cancel() {
        Trigger.cancelHandler(this)
        this.#event = null
    }
    
    execute(...args) {
        this.callback(...this.args, ...args)
    }
}

const Trigger = Object.assign(function(event, ...args) {
    Trigger._processHandlers(Trigger._mode, event, args)
    
}, {
    _handlers : new Map(),
    
    _executing : false,
    _executionQueue : [],
    
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
    
    _processHandlers(method, event, args) {
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
    
    createEventHandler (event, callback, ...args) {
        const handler = new TriggerEventHandler(event, callback, args)
        this.attachHandler(handler)
        return handler
    },
    
    on(event, callback, ...args) {
        let handler = null
        
        onMount(() => {
            handler = this.createEventHandler(event, callback, ...args)
        })
        
        onDestroy(() => {
            handler?.cancel?.()
        })
        
        return handler
    },
    
    once (event, callback, ...args) {
        const handler = this.on(event, callback, ...args)
        handler.once = true
        return handler
    },
    
})

export default Trigger
