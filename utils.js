const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3].
 * if the conversion isn't successful, throw a BadRequestError and will
be handled in your route
*/

function convertStrNums(strNums) {

    const nums = strNums.split(",").map(Number);

    for (let num of nums) {
      if (isNaN(num)) {
        throw new BadRequestError("foos is not a number");
      }
    }
    return nums;
}

module.exports = { convertStrNums };