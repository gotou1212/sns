import './Suggestion.css'

export const Suggestion = () => {
    return(
        <div className="suggestion">
            <input type="text"  className="kennsaku" placeholder="検索"/>   
            <div className="kounyuu">
                <h1 className="hutomozi">プレミアムサブスクにアップグレード</h1>
                <h3 classname="kae">買え</h3>
                <button className="kounyuubotann" 
                    onClick={() => window.open("https://www.google.com/webhp?hl=ja&ictx=0&sa=X&ved=0ahUKEwjtvf-Kht6MAxWGh1YBHXZ2DUcQpYkNCAs","_blank")}>
                    購入する
                </button>
            </div>  
            <div className="a">
                <h1>今何してる？</h1>

            </div>
        </div>
    )
}

export default Suggestion;