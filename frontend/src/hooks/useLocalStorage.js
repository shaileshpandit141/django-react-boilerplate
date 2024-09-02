import { useState, useEffect } from 'react' 

export function useLocalStorage(key, initialValue) {
    // Get value from localStorage or use initial value
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key) 
            return item ? JSON.parse(item) : initialValue 
        } catch (error) {
            console.error(error) 
            return initialValue 
        }
    }) 

    // Update localStorage whenever the storedValue changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue)) 
        } catch (error) {
            console.error(error) 
        }
    }, [key, storedValue]) 

    // Return the stored value and a function to update it
    const setValue = (value) => {
        try {
            setStoredValue(value instanceof Function ? value(storedValue) : value) 
        } catch (error) {
            console.error(error) 
        }
    } 

    return [storedValue, setValue] 
}
