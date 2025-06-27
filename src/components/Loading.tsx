export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-3">
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
      <p className="text-center text-lg text-gray-700">
        Loading data, please wait...
      </p>
    </div>
  );
};
