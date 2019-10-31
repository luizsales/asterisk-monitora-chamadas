let config = require('./config.json');
let ami = new require('asterisk-manager')(config.asterisk.port,config.asterisk.host,config.asterisk.user,config.asterisk.pwd,true);

ami.action({'action':'events','eventmask':'On'}, function(err, res) { console.log(res);});
ami.keepConnected();

    
    ami.on('managerevent', function(evt) {

        config.ramais.forEach(function(ramal) {

            
            
            

            if(evt.event == 'CoreShowChannel' && evt.calleridnum ==  ramal.ramal ){

                let sec = evt.duration.split(':').reduce((acc,time) => (60 * acc) + +time);    
                
                if( sec > ramal.tempo ){
                
    
                  ami.action({
                    'action':'Command',
                    'command':`hangup request ${evt.channel}`
                  });
                  
                }
    
            }

        });


        


    });

   

setInterval(function(){
    
    ami.action({
        'action':'CoreShowChannels',
        
});},config.verificarCada)


