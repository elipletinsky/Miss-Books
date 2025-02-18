import { getBaseUrl } from '../services/util.service.js'

export function Home() {

const imgUrl = `${getBaseUrl()}/assets/img/react.png`
    return (
        <section className="home">
            <h1 >The Book App for you!</h1>
            <img src={imgUrl} onError={(e) => 
                { e.target.onerror = null;
                    console.log("failed to load",imgUrl,e);
                    //e.target.src = '../assets/img/react.png';
                  }} alt="book-thumbnail" />
        </section>
    )
}