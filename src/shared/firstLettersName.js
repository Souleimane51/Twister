function firstLettersName(name) { 
    if (name) {
        const value = name.toUpperCase();
        const destructuredName = [...value];
        return destructuredName[0];
    }
}

export default firstLettersName;