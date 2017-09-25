
function cartInterVal (time) {
  let interVal = setInterval(() => {
    if(this.time.sec > 0) {
      let newSec = Math.round((this.time.sec - 0.1)*10)/10 + ''
      // math round 四舍五入 先扩大一倍 在除去自身
      // console.log((newSec + '').split('.')[1] ==  undefined)
      if (newSec.split('.')[0].length ==  1) {
        newSec = '0' + newSec
      }
      if ((newSec).split('.')[1] ==  undefined) {
        this.time.sec = newSec + '.0'
      } else {
        this.time.sec = newSec
      }
    } else {
      this.time.sec = 60
      if(this.time.min > 0) {
        this.time.min--
        let newMin = this.time.min + ''
        if(newMin.length == 1 ) {
          this.time.min = '0' + newMin
        }
      } else {
        this.time.min = 0
      }
    }
    if( this.min == 0 && this.sec == 0)
    clearInterval(this.interval)
  }, 100)

}


export {cartInterVal}
