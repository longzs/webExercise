/**
 * Created by zhousl on 15/12/8.
 */

//var urlData = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&encoding=json&listing_type=buy&action=search_listings&page=1&place_name=Manchester'

var zsl = {}
    zsl.urlData = 'http://api.nestoria.co.uk/api'
    zsl.reqParams = {
        country:'uk',
        pretty:1,
        encoding:'json',
        listing_type:'buy',
        action:'search_listings',
        page:1,
        place_name:'Manchester'
    }
    zsl.addListener  = function(target,type,handle){
        if(target instanceof jQuery){
            target.click(handle)
        }
        else{
            if(target.addEventListener){
                target.addEventListener(type,handle,false);
            }else if(target.attachEvent){
                target.attachEvent("on"+type,handle);
            }else{
                target["on"+type]=handle;
            }
        }
    }
    zsl.unicode2Char = function(str) {
        return (str.replace(/\\/g, "%"));
    }

    zsl.processRspData = function(data){
        //var jsonStr = JSON.stringify(data) //this.unicode2Char(JSON.stringify(data))
        //$(".listView").text(jsonStr)
        zsl.showList(data)
    }
    zsl.showList = function(data){
        /*
         "response" : {
         "application_response_code" : "100",
         "application_response_text" : "one unambiguous location",
         "attribution" : {
         "img_height" : 22,
         "img_url" : "http://s.uk.nestoria.nestimg.com/i/realestate/all/all/pbr.png",
         "img_width" : 183,
         "link_to_img" : "http://www.nestoria.com"
         },
         "created_http" : "Thu, 25 Feb 2016 03:14:19 GMT",
         "created_unix" : 1456370059,
         "link_to_url" : "http://www.nestoria.co.uk/manchester/property/buy/results-20",
         "listings" : [
         {
         "auction_date" : null,
         "bathroom_number" : 1,
         "bedroom_number" : 2,
         "car_spaces" : 0,
         "commission" : 0,
         "construction_year" : 0,
         "datasource_name" : "OnTheMarket.com",
         "guid" : "g1-TM1ATL0IDOzMjN=E",
         "img_height" : 120,
         "img_url" : "http://1.l.uk.nestoria.nestimg.com/lis/0/9/1/5b6df728b5ad1e84afcd6675d83326862bfd6.2.jpg",
         "img_width" : 160,
         "keywords" : "En suite, Balcony, Kitchen",
         "latitude" : 53.4725990295410156,
         "lister_name" : "Dandara",
         "lister_url" : "http://rd.nestoria.co.uk/rd?itype=2&l=VWeGVOqYXqZOZRKqh&s=&url=2-ePz73aTBU4LVGFByDI494Ner8aIMqOqmkHO6u50s2qDemu-ceN_G5rOpMAbDMkMIwJwZsli8WefUu6sPU8-oGzViuh5BgxraelfQSVJrMeny2ViqEdrSf0AlbLz8UGEghgfqpRYS0wSqMzxd9iD2fV94ogzZ78WAt7nLgaNsC3WXnSFxHjjAdXttMwkpfBWBGeudEifeW6_cs2aGp9V6mDXr3YffNA4bfMaWPbcE7cXNz6GYLzJa-LHgrb5rAkMLa6Wh4leNSlltkOfC_BHDE1SLEr5HnkZv4Fqu84Vq_WqIejruf1QzSTxoRLrZCJTNy2xTmNdGzmC0NDQBaBbL&v=2",
         "listing_type" : "buy",
         "location_accuracy" : 9,
         "longitude" : -2.26125001907348633,
         "price" : 211950,
         "price_currency" : "GBP",
         "price_formatted" : "211,950 GBP",
         "price_high" : 211950,
         "price_low" : 211950,
         "price_type" : "fixed",
         "property_type" : "flat",
         "summary" : "Apartment comprises of entrance hallway, two storage cupboards one of which...",
         "thumb_height" : 60,
         "thumb_url" : "http://3.l.uk.nestoria.nestimg.com/lis/0/9/1/5b6df728b5ad1e84afcd6675d83326862bfd6.1.jpg",
         "thumb_width" : 60,
         "title" : "Base, Arundel Street, Manchester, M15",
         "updated_in_days" : 4.5,
         "updated_in_days_formatted" : "this week"
         },
        * */
        /*
        *
        * $("#title").append(data.title+"<hr/>");
         $("#content").append(data.content+"<hr/>");
         //jquery解析map数据
         $.each(data.infomap,function(key,value){
         $("#mapinfo").append(key+"----"+value+"<br/><hr/>");
         });
         //解析数组
         $.each(data.comments, function(i, item) {
         $("#info").append(
         "<div>" + item.id + "</div>" +
         "<div>" + item.nickname    + "</div>" +
         "<div>" + item.content + "</div><hr/>");
         });
         });
         */
        $(".listView").append("<img src="+ data.img_url +"/>")
        //$.each(data.response, function(key,value){
        //
        //    $(".listView").append("<img src="+  +"''>")
        //})

    }
    zsl.reqTestData = function(){
        $.ajax({
            type:'get',
            url:zsl.urlData,
            data:zsl.reqParams,
            dataType:'JSONP',
            xhrFields: {
                // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                // This can be used to set the 'withCredentials' property.
                // Set the value to 'true' if you'd like to pass cookies to the server.
                // If this is enabled, your server must respond with the header
                // 'Access-Control-Allow-Credentials: true'.
                withCredentials: false
            },
            beforeSend: function(request) {
                request.setRequestHeader('Access-Control-Allow-Headers', 'true')
            },
            success:function(data, textStatus){
                //console.log(data)
                zsl.processRspData(data)
            },
            error:function(textStatus){
                console.log('rspError \n')
                console.log(textStatus)
                $(".listView").text('请求出错...')
            }
        })
    }
    zsl.init = function(){
        zsl.addListener($(".btnReq"),"click", function(){
            $(".listView").text('正在请求...')
            zsl.reqTestData()
        })
    }
    zsl.clickBtn = function(){
        //document.getElementById("abc").innerHTML="abcdefghi"
        console.log($("#input-1").val())
        if($("#input-1").val()===""){
            $("#abc").text("new ");
        }
    }
    zsl.init()

