import { AsyncStorage } from "react-native" ;
const namespace = "__rn__storage__cache__" ;
let __cache = { }; //内存存储变量
let __storage = { } ; // 本地存储变量
export const memory = {
    set(key, value) {
        if (typeof key === "string" && key) {
            __cache[key] = value;
        }else if( Object.prototype.toString(key) === "[object Object]" ){
            __cache = { ...__cache,...key }
        }
    },
    get(key) {
        if (key) {
            return __cache[key];
        } else {
            return __cache;
        }
    },
    clear(key) {
        if (key) {
            delete __cache[key];
        } else {
            __cache = {};
        }
    }
};
export const storage = {
    /**
     * 载入本地存储的数据到内存中，方便操作
     * @returns {Promise<{}>}
     */
    async load(){
        let json = await AsyncStorage.getItem(namespace);
        json  = json?JSON.parse(json) : {};
        __storage = { ...__storage,...json } ;
        return { ...__storage } ;
    },
    /**
     * 将内存的数据持久化
     * @returns {Promise<void>}
     */
    async save(){
        return await AsyncStorage.setItem(namespace,JSON.stringify(__storage)); // 格式化为字符串进行存储
    },
    /**
     * 存储数据，内存存储
     * @param key
     * @param value
     * @returns {Promise<void>}
     */
    async set(key,value) {
        __storage[key] = value ;
        return await this.save();
    },
    /**
     * 获取数据
     * @param key
     * @returns {Promise<*>}
     */
    async get(key){
        const cache = await this.load();
        return cache[key] ;
    },
    /**
     * 清空内存的数据
     * @param key
     * @returns {Promise<void>}
     */
    async clear(key){
        if (key) {
            delete __storage[key];
        } else {
            __storage = {};
        }
        return await this.save();
    }
};
export default memory;