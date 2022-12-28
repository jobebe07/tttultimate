function hasParent(elem, exp) {
    let current = elem

    while(current != document.body) {
        if (exp.startsWith('#')) {
            if(current.id == exp.substr(1)) return current
        } else if (exp.startsWith('.')) {
            if(current.classList.contains(exp.substr(1))) return current
        } else if (exp.startsWith('[')) {
            let string = exp.substr(1, (exp.length() - 2))
            if(string.contains("=")) {
                let attrName = string.split("=")[0]
                let value = string.split("=")[1]
                if(current.getAttribute(attrName) == value) return current
            } else {
                if(current.hasAttribute(string)) return current
            }
        }
        
        current = current.parentElement
    }

    return false
}

export default hasParent