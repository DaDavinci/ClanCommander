class ConsoleWindow
{
    // Constants
    public Server: HTTPServer;
    private LineCount: number = 0;

    // Constructor
    public constructor()
    {
        // Create HTTP Server
        this.Server = new HTTPServer(

            // Constructor Method
            (server) =>
            {
                // Set HTTP Server Configuration
                server.Config = {
                    Listen: true,
                    Port: 911,
                    TickRate: 20
                };

                // Log where the Server is located in console
                console.log("Recieving for requests on \nhttp://127.0.0.1:" + server.Config.Port + "/api/v1/console");
            },

            // Listener Method
            async (request, response) =>
            {
                // Check for request URL
                const { method, url, headers } = request;

                // URL handles
                switch(url){

                    case '/favicon.ico':
                        break;

                    case '/api/v1/console/addMessage':
                        //for( let i = 0; i <= request.headers.keys().length; i++ )
                        //{
                        //    await this.addMessage("header: " + request.headers.keys()[i].toString());
                        //}
                        if(method == "GET" ){
                            this.addMessage(this.getKeyValue('m', url));
                        }
                        break;

                    default:
                        await this.addMessage("Requesting: " + url);
                        break;

                }

                // Add headers to response
                response.writeHead(200, {
                    "Content-Type": "application/json",
                    "x-forwarded-proto": "http",
                    "x-forwarded-port": "911",
                    "host": "127.0.0.1"
                });

                // Add objects to var result
                const result: Object = {
                    "message": "None",
                    "metadata": {
                        "location": request.url,
                        "method": request.method
                    },
                    // "request": request,
                    // "response": response
                };

                // Send response to request origin
                response.end(JSON.stringify(result, this.getCircularReplacer()));
            }
        );

        return this;
    }

    public getKeyValue = (variable, url) =>
    {
        window.location = url;
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }

    // Method getCircularReplacer() as utility to formay json
    // Use as replacer? in JSON.stringify(text, !-->>> getCircularReplacer());
    public getCircularReplacer = () =>
    {
        const seen = new WeakSet();
        return (key, value) =>
        {
            if(typeof value === "object" && value !== null)
            {
                if(seen.has(value))
                {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };

    // Method addMessage()
    private addMessage = (text: any) =>
    {
        var LogBox: Element = document.getElementById('logbox');
        var LogLine: Element = document.getElementById('logbox-line-element');
        var NewLine: any = LogLine.cloneNode(true);

        NewLine.setAttribute('style', "display:block;");
        NewLine.setAttribute('id', 'logbox-line-' + this.LineCount.toString());
        NewLine.innerText = text;

        let line_number_formatted = "";
        if(this.LineCount < 10)
            line_number_formatted = "0" + this.LineCount.toString();
        else
            line_number_formatted = this.LineCount.toString();
        NewLine.setAttribute('data-line-number', line_number_formatted);

        // console.log(NewLine);
        LogBox.appendChild(NewLine);

        this.LineCount++;
    }

}

// Create new HTTPConsole
const consoleWindow = new ConsoleWindow();