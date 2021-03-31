import React from 'react';
import { MDBFooter } from 'mdbreact';

export const Footer = () => {
    return (
        <MDBFooter color="cyan" className="text-center font-small darken-2">
            <p className="footer-copyright mb-0 py-3 text-center">
                &copy; {new Date().getFullYear()} Copyright: <a href="//pavan1.com"> Company Name </a>
            </p>
        </MDBFooter>
    );
}
