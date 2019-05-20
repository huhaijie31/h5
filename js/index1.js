let loadingRender = (function(){

    let $loading =$(".loadingBox"),
        $current =$loading.find(".current");
    let imgData =["img/1.jpg","img/2.jpg","img/3.jpg",
        "img/4.jpg","img/5.jpg","img/6.jpg","img/7.jpg","img/8.jpg",
        "img/9.jpg","img/10.jpg","img/banner1.jpg","img/banner2.jpg",
        "img/banner3.jpg","img/banner4.jpg"];
    let n =0;
    let len =imgData.length;
    let run =function(callback){
        imgData.forEach(item=>{
           let tempImg = new Image;
            tempImg.onload =()=>{
                tempImg =null;
                $current.css("width",((++n)/len)*100+"%");
                if(n===len){
                    clearTimeout(delayTimer);
                    callback && callback();
                }

            }
            tempImg.src =item;


        })

    };
    let delayTimer =null;
    let maxDelay =function(){
        delayTimer =setTimeout(()=>{
           if(n/len>=0.9){
               callback && callback();
               return;
           }
            alert("风场遗憾")
            window.location.href ="http://www.qq.com";

        },10000)

    }
    let done =function(){
    let timer =setTimeout(()=>{
       $loading.remove();
        clearTimeout(timer);

    },1000)

    }

    return{
       init:function(){
           $loading.css("display","block");
           run(done);
           maxDelay(done);
           phoneRender.init();
       }
    }
})();
let phoneRender = (function(){
    let $phoneBox =$(".phoneBox"),
        $time =$phoneBox.find("span"),
        $answer =$phoneBox.find(".answer"),
        $answerMarkLink =$answer.find(".markLink"),
        $hang =$phoneBox.find(".hang"),
        $hangMarkLink =$hang.find(".markLink"),
        answerBell =$("#answerBell")[0],
        introduction =$("#introduction")[0];
   let answerMarkTouch =function(){
        $answer.remove();
       answerBell.pause();
       $(answerBell).remove();
       $hang.css("transform","translateY(0rem)");
       $time.css("display","block");
       introduction.play();
       computedTime()


   };
    let autoTime =null;
    let computedTime =function(){
        let duration =0;
        introduction.oncanplay =function(){
           duration =introduction.duration;
        }
        autoTime =setInterval(()=>{
            let val=introduction.currentTime;
                if(val>=duration){
                    clearInterval(autoTime)
                return;
            }
                minute =Math.floor(val/60),
                second =Math.floor(val-minute*60);
            minute=  minute<10?"0"+minute:minute;
            second = second<10?"0"+second:second;
            $time.html(`${minute}:${second}`)
        },1000)
    };
    let closePhone =function(){
        introduction.pause();
        $(introduction).remove();
        clearInterval(autoTime);
        $phoneBox.remove();
    };
    return{
       init:function(){
           $phoneBox.css("display","block")
           answerBell.play();
           answerBell.volume =0.5;
           $answerMarkLink.tap(answerMarkTouch);
           $hangMarkLink.tap(closePhone);
          messageRender.init();
       }
    }
})();
let messageRender = (function(){
    let $messageBox =$(".messageBox"),
        $wrapper =$messageBox.find(".wrapper"),
        $messageList =$wrapper.find("li"),
        $keyBoard =$messageBox.find(".keyBoard"),
        $textInp =$keyBoard.find("span"),
        $submit =$keyBoard.find(".submit");
    let step =-1,
        total =$messageList.length+1,
        autoTimer =null;
        interval =2000;
    let str ="好的，马上接受";
    let n =-1;
    let tt =0;
    let demoMonMusic =$("#demonMusic")[0];
    let showMessage =function(){
        ++step;
        if(step >= total -1){
            clearInterval(autoTimer);
            closeMessage();
            return;
        }

        let $cur =$messageList.eq(step);
        $cur.addClass("active");
        if(step>=3){
         let curH=$cur[0].offsetHeight;
            tt -= curH;
            $wrapper.css("transform","translateY(${tt}px)")
        };

        if(step===1){
            clearInterval(autoTimer);
            handleSend();
            return;

        };

    };
    let handleSend =function handleSend(){
       $keyBoard.css("transform","translateY(0rem)").on("transitionend",()=>
       {

              let textTimer =null;
           textTimer= setInterval(()=>{
              let orginHTML =$textInp.html();
               $textInp.html(orginHTML+str[++n]);
               if(n >=str.length-1){
                   clearInterval(textTimer)
                   $submit.css("display","block");
               }

           },100)

       });


    };
    let closeMessage =function(){
        let delayTimer = setTimeout(()=>{
            demoMonMusic.pause();
            $(demoMonMusic).remove();
            $messageBox.remove();
            clearInterval(delayTimer)

        },interval)


    }
    let handleSubmit =function(){

        if(n=== str.length-1){
            $(`<li class="self">
                <i class="arrow"></i>
                <img src="img/1.jpg" alt="" class="pic">
              ${$textInp.html()}
            </li>`).insertAfter($messageList.eq(1)).addClass("active");

            $messageList =$wrapper.find("li");
            $textInp.html("");
            $submit.css("display","none");
            $keyBoard.css("transform","translateY(3.7rem)");
            autoTimer =setInterval(showMessage,interval);

        }




    }


    return{
       init:function(){
           $messageBox.css("display","block")
           showMessage();
          autoTimer =setInterval(showMessage,interval);
          $submit.tap(handleSubmit);
           demoMonMusic.play();
           demoMonMusic.volume =0.1;
           cubeRender.init();
       }
    }
})();
let cubeRender = (function(){
let $cubeBox =$(".cubeBox"),
    $cube =$(".cube"),
    $cubeList =$cube.find("li");
    let start =function(ev){
            let point =ev.changedTouches[0];
        this.strX =point.clientX;
        this.strY =point.clientY;



        },
        move =function(ev){
            let point =ev.changedTouches[0];
            this.changeX =point.clientX -this.strX;
            this.changeY =point.clientY -this.strY;

        },
        end =function(ev){
          let {changeX,changeY,rotateX,rotateY} =this,
              isMove =false;
            Math.abs(changeX)>10 ||Math.abs(changeY)>10?isMove=true:null;
            if(isMove){
                rotateX =rotateX-changeY/3;
                rotateY =rotateY+changeX/3;
                $(this).css("transform",`scale(0.6) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
                this.rotateX =rotateX;
                this.rotateY =rotateY;
                console.dir(this)

            }
            ["strX","strY","changeX","changeY"].forEach(item=>{
                this[item] =null;

            })





        };
    return{
       init:function() {
      $cubeBox.css("display","block");
       //    手指移动让cube跟着旋转
           let cube =$cube[0];
           cube.rotateX =45,
           cube.rotateY =30;
           $cube.on("touchstart",start)
               .on("touchmove",move
               ).on("touchend",end);
           $cubeList.tap(function(){
               $cubeBox.css("display","none");
               let index =$(this).index();
              detailRender.init(index);

           })

       }


    }
})();
let detailRender = (function(){
    let $detailBox =$(".detailBox");
    let swiper =null;
    let $dl =$(".page1>dl");

    let swiperinit =function(){
        swiper =new Swiper(".swiper-container", {
            effect: "coverflow",
            onInit:move,
            onTransitionEnd:move
        })
}











    let move =function(swiper){

        let activeIn =swiper.activeIndex,
            slideAry =swiper.slides;
        console.log(activeIn);
        if(activeIn===0){

            $dl.makisu({
                selector:"dd",
                overlap:0.8,
                speed:0.8
            });
            $dl.makisu("open");
        }
        else{
            $dl.makisu({
                selector:"dd",
                speed:0
            });
            $dl.makisu("close");
        };
        slideAry.forEach((item,index)=>{
            if(activeIn === index){
               item.id=`page${index+1}`;
                return;
            }
           item.id =null;
        })

    };
    return{
        init:function(index=0){
            $detailBox.css("display","block");
            if(!swiper) {
                swiperinit();
            }
            swiper.slideTo(index,0)
           /*  $dl.makisu({
             selector:"dd",
             overlap:0.8,
             speed:0.8
             });
             $dl.makisu("toggle");*/
        }
    }
})();


let url =window.location.href,
    well =url.indexOf("#"),
    hash =well===-1?null:url.substr(well +1);
switch (hash){
    case "loading":
        loadingRender.init();
        break;
    case "phone":
        phoneRender.init();
        break;
    case "message":
        messageRender.init();
        break;
    case "cube":
        cubeRender.init();
        break;
    case "detail":
        detailRender.init();
        break;
    default:
        loadingRender.init();
}
