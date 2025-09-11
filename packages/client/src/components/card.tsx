function Card({ className, ...props}: React.ComponentProps<'div'>) {
    return <div 
    className={`bg-white  shadow-xs shadow-black  rounded-lg p-6 relative ${className}`} 
    {...props} />
}
export {Card};