import './Suggestion.css'

export const Suggestion = () => {
    return(
        <div className="suggestion">
               <input type="text"  className="kennsaku" placeholder="検索"/>   
               <div className="kounyuu">
                <h2 className="hutomozi">プレミアムサブスクにアップグレード</h2>
                <h3 classname="kae">買え</h3>
                <button className="kounyuubotann">購入する</button>
               </div>  
        </div>
    )
}

export default Suggestion;