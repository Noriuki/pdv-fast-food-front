
export default function FlexContainer({ children }: any) {
  return (
    <div className="w-full my-8 flex flex-wrap flex-col space-y-4">
      {children}
    </div>
  )
}
