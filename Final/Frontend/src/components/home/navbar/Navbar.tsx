export const Navbar = () => {

    const toggleSidebar = () => {
        let sidebarContainer = document.getElementById('sidebar-container')
        if (sidebarContainer) {
            if (!sidebarContainer.style.display) {
                if (sidebarContainer) {
                    sidebarContainer.style.display = 'none'
                }

            } else {
                sidebarContainer ? sidebarContainer.style.display = '' : ''
            }
        }

    }

    return (
        <div className="container-fluid px-5 pt-5" style={{ marginTop: '-3rem', marginLeft: '-3rem' }}>
            <button className="btn text-light" onClick={() => toggleSidebar()} style={{ background: '#004B7F' }}> <i className="fa fa-bars"></i> </button>
        </div>
    )


}
