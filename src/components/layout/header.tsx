import Logo from "@/assets/logo-with-title.png"

export default function Header() {
    return (
        <div className="h-[55px] pt-4 px-8 flex justify-between">
            <img src={Logo} alt="" width={155}/>
        </div>
    )
}