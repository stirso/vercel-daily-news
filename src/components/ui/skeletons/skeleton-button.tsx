type SkeletonButtonProps = {
  classname?: string;
  label?: string;
}

export default function SkeletonButton ({ classname, label }: Readonly<SkeletonButtonProps>) {
  return (
    <button className={classname}>
      {label}
    </button>
  )
}