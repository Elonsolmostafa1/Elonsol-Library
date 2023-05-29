export function resetPasswordHTML(token) {
    return `<html xmlns="http://www.w3.org/1999/xhtml">

    <head></head>
    
    <body>
        <style></style>
        <spacer size="16"></spacer>
        <container>
            <row class="header" style="background:#6C6C6C">
                <columns>
                    <spacer size="16"></spacer>
                </columns>
            </row>
            <row>
                <columns>
                    <spacer size="32"></spacer>
                    <spacer size="16"></spacer>
                    <h1 class="text-center" style="color:#01252F;font-family:Lato,sans-serif;font-size:30pt;text-align:center">Forgot Your Password</h1>
                    <spacer size="16"></spacer>
                    <p class="textcenter" style="font-family:Lato,sans-serif;text-align:center">It happens. This is the code to reset password.</p>
                    <div class="large expand" href="#" style="font-family:Lato,sans-serif;padding:20px;text-align:center;margin:20px -100px;background-color:black;color:white;margin:auto; width:fit-content; font-size:10px;font-weight:700">${token}</div>
                    
                </columns>
            </row>
            <table class="headerbody" style="margin:10px 0 100px 0">
            <spacer size="16"></spacer>
        </container>
    </body>
    
    </html>`
}