import ChatBox from './ChatBox';
import Navbar from './Navbar';
import SupportButton from './SupportButton';

const Layout = ({ children }) => {
    return (
        <>
            <div className="layout">
                <Navbar />
                <main>{children}</main>
                <ChatBox />
                <SupportButton />
            </div>
        </>
    );
};

export default Layout;
