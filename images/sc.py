import os


def save_filenames(folder_path, output_file="filenames.txt", extensions=None):
    # Define default extensions if none provided
    if extensions is None:
        extensions = [".jpg", ".jpeg", ".png", ".gif"]

    # Get all files and filter by extension
    files = [
        f
        for f in os.listdir(folder_path)
        if os.path.splitext(f)[1].lower() in extensions
    ]

    # Get filenames without extensions
    filenames = [os.path.splitext(f)[0] for f in files]

    # Sort filenames
    filenames.sort()

    # Write to file
    with open(output_file, "w") as f:
        f.write("\n".join(filenames))

    print(f"Found {len(filenames)} files. Names written to {output_file}")


# Example usage
folder_path = "2"
extensions = [".jpg", ".png"]  # Specify which extensions to include
save_filenames(folder_path, extensions=extensions)
