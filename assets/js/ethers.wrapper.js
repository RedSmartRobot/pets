window.blockchainProvider = (function() {
    if (window.ethereum) {
        var provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        // when user is changing the blockchain network the current page should be reloaded
        provider.on('network', (newNetwork, oldNetwork) => {
            if (oldNetwork) {
                window.location.reload()
            }
        })
        return provider
    }
    return null
})()

window.blockchainProvider.strToHex = function(str) {
    return ethers.utils.hexZeroPad(ethers.utils.hexlify(ethers.utils.toUtf8Bytes(str)), 32)
}
window.blockchainProvider.hexToStr = function(hex) {
    return ethers.utils.toUtf8String(ethers.utils.hexlify(ethers.utils.hexStripZeros(hex)))
}

window.blockchainProvider.toWei = function(value, unit = 'ether') {
    unit = unit.toLowerCase();
    const units = ['kwei', 'mwei', 'gwei', 'szabo', 'finney', 'ether']
    if (units.indexOf(unit) == -1) {
        return false;
    }
    return String(Math.round(ethers.utils.formatUnits(ethers.utils.parseUnits(String(value), unit), 'wei')));
}

window.blockchainProvider.fromWei = function(value, unit = 'ether') {
    unit = unit.toLowerCase();
    const units = ['kwei', 'mwei', 'gwei', 'szabo', 'finney', 'ether']
    if (units.indexOf(unit) == -1) {
        return false;
    }
    return ethers.utils.formatUnits(String(value), unit);
}
