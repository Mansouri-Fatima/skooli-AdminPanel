import classNames from "classnames";
function Button({primary , secondary ,third, outlined , rounded , success , warning , danger , children , ...rest}) {
const m_classNames = classNames(
rest.className , 
"flex items-center" , 
"px-4 py-2" , 
{
    "bg-[#52BD94] text-white px-4 py-2 rounded-md" : primary , 
    "rounded-full" : rounded  ,
    "text-[#52BD94] px-3 py-1" : secondary,
    "mt-6 bg-[#52BD94] text-white px-6 py-2 rounded-lg":third,
    "bg-white border-2 text-[#52BD94] px-4 py-2 rounded-md" : outlined
}
)    

delete m_classNames.className ;

return <button className={m_classNames} {...rest}>{children}</button>
}

export default Button;