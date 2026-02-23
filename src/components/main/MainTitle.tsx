const MainTitle = ({
  department,
  page,
  title,
  description,
}: {
  department: string;
  page: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">{department}</span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900 font-medium">{page}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mt-1 font-playfair">
          {title}
        </h1>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default MainTitle;
