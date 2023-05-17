<script>
    import Trigger from "utility/trigger-svelte.js"

    const DEFAULT_SETTINGS = {
        bgmVolume : 0.5,
        soundVolume : 0.5,
        rhythmOffset : 0,
    }

    export let settings = loadSettings()

    Trigger.on("command-set-setting", setSetting)

    function loadSettings() {
        const result = Object.assign({}, DEFAULT_SETTINGS)

        const data = localStorage.rollingScampussSettings
        if (data) {
            Object.assign(result, JSON.parse(data))
        }

        return result
    }

    function saveSettings() {
        localStorage.rollingScampussSettings = JSON.stringify(settings)
    }

    function setSetting(name, value) {
        settings[name] = value
        saveSettings()
    }

</script>
