import {makeAutoObservable} from "mobx";

class Store {
    items = []
    data = {}

    filter=[]
    paginat=[]

    paginatAllItem = 50
    paginatAllPages = 0
    paginatPage=0


    sortBy = null

    vueCreateRow = false
    downloaded = false
    rowShow = {
        visible: false,
        obj:{}
    }



    constructor() {
        makeAutoObservable(this)
    }


    clearFilter(){
        this.filter = []
    }
    addFilter(e){
        this.filter.push(e)
    }
    pagination(e){
        this.paginatAllPages = Math.ceil(this.filter.length/this.paginatAllItem)
        if(e > this.filter.length){e=0}
        this.paginat = this.filter.slice(e,e+this.paginatAllItem)
        this.paginatPage = e
    }
    cellEditorShow(e){
        this.rowShow.visible = true
        this.rowShow.obj = e
    }
    opener(){
        this.vueCreateRow = !this.vueCreateRow
    }
    addJSON(JSON){
        this.items = JSON
        this.filter = [...this.items]
        this.pagination(0)
    }
    addItem(Item){
        this.items.unshift(Item)
        this.filter.unshift(Item)
        this.pagination(0)
    }
    sort(itemSort){
        if(this.sortBy === itemSort){
            this.sortBy = null
            this.filter.sort((a,b)=>{
                if (a[itemSort]>b[itemSort]) {
                    return -1;
                }
                if (a[itemSort]<b[itemSort]) {
                    return 1;
                }
                return 0;
            })
        }
        else{
            this.sortBy = itemSort
            this.filter.sort((a,b)=>{
                if (a[itemSort]<b[itemSort]) {
                    return -1;
                }
                if (a[itemSort]>b[itemSort]) {
                    return 1;
                }
                return 0;
            })
        }
        this.pagination(this.paginatPage)
    }
}

export default new Store();