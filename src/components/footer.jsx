import React  from 'react';
import { Link , useParams} from 'react-router-dom';
import '../styles/footer.css';


const Footer = ()=>{
    return(
        <>
            <footer class="footer">
                <div class="footer-wrapper">
                    <div class="footer-card">
                        <div class="f-headline f-item">LET US HELP YOU</div>
                        <div class="f-item">
                            <Link to =''>Contact Us</Link>
                        </div>

                    </div>
                    <div class="footer-card">
                        <div class="f-headline f-item">ABOUT</div>
                        <div class="f-item">
                            <Link href =''>About Us</Link>
                        </div>
                       

                    </div>
                    <div class="footer-card">
                        <div class="f-headline f-item">Latest Post</div>
                        <div class="f-item">
                            <Link href =''>Admisson</Link>
                        </div>



                    </div>
                    <div class="footer-card">
                        

                    </div>
                </div>
            </footer>
        </>
    )
};

export default Footer;