document.addEventListener("DOMContentLoaded", function() {
    const teamMembersContainer = document.getElementById('team-members');

    function adjustTeamMembersLayout() {
        const containerWidth = teamMembersContainer.clientWidth;
        const scrollWidth = teamMembersContainer.scrollWidth;

        if (scrollWidth > containerWidth) {
            teamMembersContainer.style.justifyContent = 'flex-start';
        } else {
            teamMembersContainer.style.justifyContent = 'center';
        }
    }

    // Initial adjustment
    adjustTeamMembersLayout();

    // Adjustment on window resize
    window.addEventListener('resize', adjustTeamMembersLayout);
});
