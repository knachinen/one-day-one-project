export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-8">
      <div className="container mx-auto px-4 text-center text-gray-600">
        {/* Copyright Information */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} VibeCoding. All rights reserved.
        </p>

        {/* Privacy Policy Link Placeholder */}
        <p className="text-sm mt-1">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </p>

        {/* Social Media Icons Placeholder */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-gray-500 hover:text-vibe-blue">
            {/* Replace with actual SVG icons */}
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-energy-orange">
            {/* Replace with actual SVG icons */}
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.29 20.251c-1.307.749-2.613 1.258-4.301 1.258-2.697 0-4.606-1.554-4.606-4.607 0-3.053 1.909-4.607 4.606-4.607 1.688 0 2.994.509 4.301 1.258V8.29c0-1.246-.051-2.434-.148-3.535C6.915 3.393 4.996 2 2.766 2c-2.228 0-4.004 1.393-4.004 3.14S.538 8.28.538 8.28v1.942c.097 1.101.148 2.289.148 3.535V20.25c0 .001.002.001.002.001.002.001.001 0 .001 0zM17 12c0 2.072-1.682 3.754-3.754 3.754S9.492 14.072 9.492 12s1.682-3.754 3.754-3.754S17 9.928 17 12zm7.04-3.92C23.51 6.84 22.067 6 20 6c-2.067 0-3.51 0.84-4.04 2.08H16v2.32h-1.64V12h1.64v2.32H16V16h4.55C23.51 16 25 15.16 25 13.92v-2.12c0-1.24-1.49-1.99-1.96-1.8z" />
            </svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            {/* Replace with actual SVG icons */}
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.286 2.477 7.935 6.04 9.771.554.102.756-.24.756-.532 0-.263-.01-1.127-.01-2.083-2.404.522-2.915-1.16-2.915-1.16-.395-1.004-.96-1.272-.96-1.272-.786-.535.06-.525.06-.525.867.062 1.325.89 1.325.89.77.771 2.015.546 2.505.417.078-.323.302-.546.554-.672-1.9-.215-3.89-.95-3.89-4.24 0-.936.332-1.7.876-2.298-.088-.215-.38-.936.084-2.26 0 0 .71-.228 2.32.875.67-.187 1.378-.28 2.085-.28.707 0 1.415.093 2.085.28 1.61-1.103 2.32-.875 2.32-.875.468 1.324.177 2.045.084 2.26.545.598.875 1.362.875 2.298 0 3.298-1.99 4.02-3.89 4.237.308.266.586.79.586 1.594 0 1.15-.01 2.083-.01 2.365 0 .297.199.64.76.533C19.523 19.935 22 16.286 22 12c0-5.523-4.477-10-10-10z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
