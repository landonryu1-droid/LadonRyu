// Next.js custom App layout
export default function Layout({ children }) {
    return (
        <html>
            <head>
                <title>LadonRyu Live Translator</title>
            </head>
            <body>{children}</body>
        </html>
    );
}