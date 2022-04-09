//import UserImg from "../assets/img/default-user.png"
const Avatar = (props: any) => {
    const { alt = 'avatar', size = '12', className, ...rest } = props
    return (
        <div {...rest} className={`rounded-full h-${size} w-${size} bg-azul3 flex items-center justify-center hover:filter hover:brightness-75 ${className} `}>
        </div>
        //<img src={"../assets/img/default-user.png"} alt={alt}  {...rest} className={`rounded-full h-${size} w-${size} flex items-center justify-center hover:filter hover:brightness-75 ${className} `} />
    )
}
export default Avatar;