function palindrome(str) {
    let regex = /[a-zA-Z0-9]/gi
    let matches= str.match(regex)
    
    
    if(matches.reverse().join("").toLowerCase() !== str.match(regex).join("").toLowerCase()) return false
    
    return true
    }
    
    palindrome("eye");
    