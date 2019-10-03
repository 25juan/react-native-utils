import _axios from "axios" ;
import _ from "lodash" ;
/**
 *
 * @param prefix 当前需要拼接的url 前缀
 * @param urls  url 集合e.g.{ postUser:"url地址(post打头表示是post请求)","getUser":"url地址(get打头表示是post请求) eg./user/{id}"  }
 * 自动创建http 请求，但是需要遵循 url 定义规范
 */
const parseUrl = (prefix="",urls={ })=>{
    Object.keys({ ...urls }).map(key=>{ // 判断当前的url 是不是http|https 开头
        urls[key] = /^https:|^http:/.test(urls[key]) ? urls[key] : prefix + urls[key];
    });
    Object.keys({ ...urls }).map(key=>{
        let url = urls[key] ;
        urls[key] = async (data)=>{
            return ajax(url,'post',data);
        }
    });
    return urls ;
};
/**
 * ajax 请求工具类
 * @param url
 * @param method
 * @param data
 * @returns {Promise.<*>}
 */
const ajax = async (url,method,data = {  })=>{
    url = _.template(url, {
        interpolate: /{([\s\S]+?)}/g,
    })(data); // 将restful 里面的参数给替换掉
    let o = {};
    if(method === "get"){
        o.params = { ...data } ;
    }else{
        o.data = { ...data } ;
    }
    let headers = {
        "Content-Type":'text/plain',
    } ;
    const config = getAxiosConfig() ;
    return await _axios(url,{
        method,
        ...o ,
        ...config,
    }).then(response=>response.data) ;
};

let _config = { };
export const setAxiosConfig = function (config) {
    _config = { ...config } ;
};
const getAxiosConfig = function () {
    return _config ;
};
export const axios = _axios ;

export default parseUrl ;
