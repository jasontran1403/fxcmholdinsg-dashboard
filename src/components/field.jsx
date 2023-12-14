export const Input = ({
    id = "",
    type = "text",
    placeholder = "",
    value = "",
    error = [],
    onChange = () => {}
}) => {
    return (
        <>
            <div className="relative">
                <input
                    id={id}
                    type={type}
                    className={`transition-all duration-300 bg-gray-100" : ""
                    } mt-2 py-2.5 px-4 w-full ${
                        error.length
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } rounded-md text-sm placeholder-gray-400 focus:ring ${
                        type === "password" ? " pr-10" : ""
                    }`}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />

                {error.map((item, index) => (
                    <p key={index} className="text-red-400 text-sm mt-0.5">
                        {item}
                    </p>
                ))}
            </div>
        </>
    );
};

export const Checkbox = ({ id = "", label = "" }) => {
    return (
        <label htmlFor={id} className="space-x-2 inline-block mr-2">
            <input
                id={id}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                type="checkbox"
            />
            <span className="text-sm cursor-pointer">{label}</span>
        </label>
    );
};
