angular.module('textService')
    .service('text', [function () {
        return {
            textFixedSize: function (text,maxsize,completewith,reverse) {
                if (text.length >= maxsize) {
                    text = text.substr(0, maxsize);
                } else {
                    if (reverse==true){
                        for (var i = text.length; i < maxsize; i++) {
                            text = completewith + text;
                        }
                    }else{
                        for (var i = text.length; i < maxsize; i++) {
                            text += completewith;
                        }
                    }
                }
                return text;
            },
            saveTxtFile:function(name,content){
                var createdFile = document.createElement('a');                
                var file = new Blob([content], { type: 'text/plain' });
                createdFile.href = URL.createObjectURL(file);
                createdFile.download = name;
                setTimeout(function(){
                    createdFile.click();
                },100);
            }
        }
    }])