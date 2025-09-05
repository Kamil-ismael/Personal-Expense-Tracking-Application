function Card({ className, ...props}: React.ComponentProps<'div'>) {
    return <div 
    className={`bg-white  shadow-xl rounded-lg p-6 border-2 relative ${className}`} 
    {...props} />
}
export {Card};