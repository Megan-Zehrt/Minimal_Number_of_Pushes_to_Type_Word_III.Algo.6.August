// 3016. Minimum Number of Pushes to Type Word II



// You are given a string word containing lowercase English letters.

// Telephone keypads have keys mapped with distinct collections of lowercase English letters, which can be used to form words by pushing them. For example, the key 2 is mapped with ["a","b","c"], we need to push the key one time to type "a", two times to type "b", and three times to type "c" .

// It is allowed to remap the keys numbered 2 to 9 to distinct collections of letters. The keys can be remapped to any amount of letters, but each letter must be mapped to exactly one key. You need to find the minimum number of times the keys will be pushed to type the string word.

// Return the minimum number of pushes needed to type word after remapping the keys.

// An example mapping of letters to keys on a telephone keypad is given below. Note that 1, *, #, and 0 do not map to any letters.






/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    
    let dictionary = new Map();
   
   for (let letter of word) {
       if (dictionary.has(letter)) {
           let freq = dictionary.get(letter);
           dictionary.set(letter, freq + 1);
       } else {
           dictionary.set(letter, 1);
       }
   }
   
   let mapArray = Array.from(dictionary);
   
   // Sort the array by the values in descending order
   mapArray.sort((a, b) => b[1] - a[1]);
   
   // Convert the sorted array back to a Map
   let sortedMap = new Map(mapArray);
   
   // Array to represent keys from 2 to 9
   let keys = Array(8).fill().map(() => []);  // keys[0] = key 2, keys[1] = key 3, ..., keys[7] = key 9
   
   let index = 0;
   for (let [char, freq] of sortedMap) {
       keys[index].push(char);
       index = (index + 1) % 8;  // Cycle through the keys 2 to 9
   }
   
   // Calculate total key presses
   let totalPresses = 0;
   for (let letter of word) {
       for (let i = 0; i < keys.length; i++) {
           let key = keys[i];
           let pos = key.indexOf(letter);
           if (pos !== -1) {
               totalPresses += pos + 1;  // Position is 0-based, so add 1 for key presses
               break;
           }
       }
   }
   
   return totalPresses;
   
   
   };