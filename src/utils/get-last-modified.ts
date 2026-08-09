import { execSync } from "node:child_process";

export function getLastModifiedDate(filePath: string): string {
	try {
		const output = execSync(`git log -1 --format=%ai -- "${filePath}"`)
			.toString()
			.trim();

		if (!output) {
			return new Date().toISOString().split("T")[0];
		}

		return output.split(" ")[0];
	} catch {
		return new Date().toISOString().split("T")[0];
	}
}
