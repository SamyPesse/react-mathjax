let pendingScripts = [];
let pendingCallbacks = [];
let needsProcess = false;

/**
 * Process math in a script node using MathJax
 * @param {MathJax}  MathJax
 * @param {DOMNode}  script
 * @param {Function} callback
 */
function process(MathJax, script, callback) {
    pendingScripts.push(script);
    pendingCallbacks.push(callback);
    if (!needsProcess) {
        needsProcess = true;
        setTimeout(() => doProcess(MathJax), 0);
    }
}

function doProcess(MathJax) {
    MathJax.Hub.Queue(function() {
        const oldElementScripts = MathJax.Hub.elementScripts;
        MathJax.Hub.elementScripts = (element) => pendingScripts;

        try {
            return MathJax.Hub.Process(null, () => {
                // Trigger all of the pending callbacks before clearing them
                // out.
                for (const callback of pendingCallbacks) {
                    callback();
                }

                pendingScripts = [];
                pendingCallbacks = [];
                needsProcess = false;
            });
        } catch (e) {
            // IE8 requires `catch` in order to use `finally`
            throw e;
        } finally {
            MathJax.Hub.elementScripts = oldElementScripts;
        }
    });
}

module.exports = process;
