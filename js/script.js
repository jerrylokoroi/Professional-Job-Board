document.addEventListener('DOMContentLoaded', function() {
    const jobListingsSection = document.getElementById('job-listings');
    const jobListingsContainer = document.getElementById('job-listings-container');
    const searchForm = document.querySelector('form');

    let jobsData = [];
 
    // Fetch JSON data from external file
    fetch('./json/jobs-data.json')
        .then(response => response.json())
        .then(data => {
            jobsData = data.featuredJobs;
            displayJobs(jobsData);  
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to filter jobs based on keywords and location
    function filterJobs(keyword, location) {
        return jobsData.filter(job => {
            const titleMatch = job.title.toLowerCase().includes(keyword.toLowerCase());
            const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());
            return titleMatch && locationMatch;
        });
    }

    // Function to display jobs
    function displayJobs(jobs) {
        jobListingsSection.innerHTML = '';

        jobs.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.classList.add('job-listing');

            jobElement.innerHTML = `
                <h3>${job.title}</h3>
                <p>Company: ${job.company}</p>
                <p>Location: ${job.location}</p>
                <p>Description: ${job.description}</p>
                <p>Skills: ${job.skills.join(', ')}</p>
                <p>Posted Date: ${job.postedDate}</p>
                <a class="apply-button" href="${job.applicationURL}" target="_blank">Apply Now</a>
            `;

            jobListingsSection.appendChild(jobElement);
        });
    }

    // Event listener for form submission
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const keyword = document.getElementById('job-search').value;
        const location = document.getElementById('location').value;

        const filteredJobs = filterJobs(keyword, location);
        displayJobs(filteredJobs);
    });
});



  