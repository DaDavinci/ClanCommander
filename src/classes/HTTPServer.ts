type HTTPConfig =
{
    Listen: boolean;
    Port: number;
    TickRate: number;
};
class HTTPServer
{

    // Packages
    Server = require('http');

    // Variables
    Interval: NodeJS.Timeout;

    // Static Config
    Config: HTTPConfig = {
        "Listen": true,
        "Port": 911,
        "TickRate": 20,
    };

    // Constructor
    constructor(cons, run)
    {
        try{
            // Execute callback to arg[cons]
            cons(this);

            if(this.Config.Listen) {
                // Create Listening HTTP Server with callback to arg[run]
                this.Server.createServer(run).listen(this.Config.Port);
            }

        }catch(e: any){
            console.error(e.toString());
        }
        return;
    }

};