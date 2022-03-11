/* 
 * @Author       : Eug
 * @Date         : 2022-03-10 15:07:25
 * @LastEditTime : 2022-03-11 14:23:04
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/public/js/index.js
 */
const box = document.querySelector('.banner-wrapper')
if (box) {
  box.style.backgroundColor = '#ccc'
}

const handleClick = (e) => {
  const buttons = document.querySelectorAll('.headerButton')
  buttons.forEach(b => {
    if (e.textContent === b.textContent) {
      b.classList.remove('outline')
    } else {
      if (!b.getAttribute('class').includes('outline')){
        b.classList.add('outline')
      }
    }
    
  })
}