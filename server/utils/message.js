var generateMessage = (message) => {
    return {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMessage};
