# urlshortener-nodejs #
The test project that realizes API functionality of the substitution of long URLs to short 

## Install ##

1. Clone or download git repository

    > git clone https://github.com/DrMom161/urlshortener-nodejs.git
2. Install npm components from root folder

    > npm install
4. Start web server with this code

5. Use your front-end with this api (example, https://github.com/DrMom161/urlshortener-angular-part)


## Usage ##
### Create new short url ###
Use http **POST** request to **"/create_short_url"** for creating new short url

**Params:**
* **shortUrl** - (string) desired short url, max length - 10
     
* **longUrl** - (string) link for redirecting

### Use short url ##
Use http **GET** request to **"/{YOUR_SHORT_URL}"**

## Demo ##
API: https://obscure-beyond-70161.herokuapp.com

Front-end: https://pipy-vol.000webhostapp.com/
