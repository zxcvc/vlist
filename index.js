

function get_content(n){
    const arr = []
    for(let i = 0; i < n; ++i){
        const n = Math.random() * 100 + 1
        arr.push(i.toString().repeat(n))
    }
    return arr
}

function set_doc(content){
    const box = document.querySelector('.box')
    const fg = new DocumentFragment()
    content.forEach(v=>{
        const div = document.createElement('div')
        div.textContent = v
        fg.appendChild(div)
    })
    box.appendChild(fg)
}

function get_size(father_doc){
    const box = father_doc
    const childs = box.children
    const length = childs.length
    const arr = []
    let all_length = 0
    let total = 0
    for(let i = 0; i < length; ++i){
        const item = childs[i]
        const info = item.getBoundingClientRect()
        all_length += info.height
        arr.push(total)
        total += info.height
    }
    return [arr,all_length]
}



const conetnt = get_content(2000)
set_doc(conetnt)
const scroller = document.querySelector('#scroller')
const box = document.querySelector('.box')
const pad = document.querySelector('#pad')
const [size_list,total] = get_size(box)
pad.style = `height:${total}px`
clear(box)
console.log(size_list)
set_doc_by_scroll_top(box,size_list,0)

function clear(father_doc){
    father_doc.innerHTML = ''
}

function binary_search(list,target){
    let left = 0;
    let right = list.length - 1
    let mid = 0
    let ans = 0
    while(left <= right){
        mid = (left + right) >> 1
        if(list[mid] === target) return mid
        if(list[mid] > target){
            right = mid - 1
        }else{
            left = mid + 1
            ans = mid
        }
    }
    return ans
}

function set_doc_by_scroll_top(father_doc,size_list,scroll_top){
    let start_index = binary_search(size_list,scroll_top)
    const scroller_height = box.clientHeight
    let end_index = binary_search(size_list,scroll_top+scroller_height)
    const content = conetnt.slice(start_index,end_index+1)
    const fg = get_div(content,size_list)
    father_doc.appendChild(fg)
}

function get_div(conetnt,position){
    const fg = new DocumentFragment()
    conetnt.forEach((item,index)=>{
        const div = document.createElement('div')
        div.textContent = item
        fg.appendChild(div)
    })
    return fg
}

scroller.addEventListener('scroll',e=>{
    let scroll_top = e.target.scrollTop
    console.log(scroll_top)
    let start_index = binary_search(size_list,scroll_top)
    start_index = Math.max(start_index,0)
    const scroller_height = box.clientHeight
    let end_index = binary_search(size_list,scroll_top+scroller_height)
    end_index = Math.min(end_index+1,2000)
    box.style = `transform: translateY(${size_list[start_index]}px)`
    console.log(start_index,end_index)
    clear(box)
    set_doc_by_scroll_top(box,size_list,scroll_top)
})
