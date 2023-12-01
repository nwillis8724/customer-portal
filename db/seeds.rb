# # Seed data for admins
# noah = Admin.create(username: 'Noah', password: 'password123', position: 'Programmer')
# junior = Admin.create(username: 'Junior', password: 'juniorpassword', position: 'Manager')
# tom = Admin.create(username: 'Tom', password: 'tomspassword', position: 'Residential Foreman')

# # Seed data for jobs
# job1 = Job.create(address: '123 Main St, Glencoe', date_of_install: '01/15/2023', access_code: '123MSGCS')
# job2 = Job.create(address: '456 Oak Ave, Winnetka', date_of_install: '02/01/2023', access_code: '456OAWKS')
# job3 = Job.create(address: '789 Elm Ln, Kennilworth', date_of_install: '03/10/2023', access_code: '789ELKWS')
# job4 = Job.create(address: '321 Maple Dr, North Field', date_of_install: '04/05/2023', access_code: '321MDNFS')
# job5 = Job.create(address: '306 Leitch Ave, La Grange', date_of_install: '04/15/2023', access_code: '306LALGW')

# # Seed data for admin_jobs
# AdminJob.create(admin: noah, job: job1)
# AdminJob.create(admin: junior, job: job1)
# AdminJob.create(admin: tom, job: job1)

# AdminJob.create(admin: noah, job: job2)
# AdminJob.create(admin: junior, job: job2)

# AdminJob.create(admin: noah, job: job3)
# AdminJob.create(admin: tom, job: job3)

# AdminJob.create(admin: junior, job: job4)

# AdminJob.create(admin: noah, job: job5)
# AdminJob.create(admin: tom, job: job5)

# # # Seed data for doors
# Door.create(model: 'AP130', size: '16x8', color: 'Black', date_of_arrival: '01/10/2023', job_id: 1)
# Door.create(model: 'AP200', size: '8x7', color: 'White', date_of_arrival: '01/20/2023', job_id: 1)
# Door.create(model: 'Ranch House', size: '16x7', color: 'Brown', date_of_arrival: '02/05/2023', job_id: 2)
# Door.create(model: 'Ranch House', size: '8x7', color: 'Gray', date_of_arrival: '03/15/2023', job_id: 3)
# Door.create(model: 'Ranch House', size: '16x7', color: 'Oak', date_of_arrival: '03/25/2023', job_id: 3)
# Door.create(model: 'Alumaview', size: '18x7', color: 'Black', date_of_arrival: '04/01/2023', job_id: 4)
# Door.create(model: 'Ranch House', size: '8x7', color: 'Stained', date_of_arrival: '04/01/2023', job_id: 5)
# Door.create(model: 'Rock Creek', size: '18x7', color: 'Black', date_of_arrival: '04/01/2023', job_id: 5)
# Door.create(model: 'Rock Creek', size: '16x7', color: 'Black', date_of_arrival: '04/01/2023', job_id: 5)

# # # Seed data for notes
# Note.create(note: 'Door has been installed', job_id: 1, door_id: 1)
# Note.create(note: 'Painted AP200', door_id: 2)
# Note.create(note: 'I Love Ranch House', door_id: 3)
# Note.create(note: 'Doors Arrived', job_id: 3, admin_id: 1)
# Note.create(note: 'Started Installation', job_id: 3, door_id: 5, admin_id: 1)
# Note.create(note: 'Alumaview Ordered', job_id: 4, door_id: 6)
# Note.create(note: 'Site Visit', job_id: 4, door_id: 6)
# Note.create(note: 'Completed Installation', job_id: 4)
# Note.create(note: 'Additional Note for Job', door_id: 6)
# Note.create(note: 'Additional Note for Job', job_id: 5, door_id: 6)
# Note.create(note: 'Admin Comment', job_id: 2, door_id: 3, admin_id: 2)
# Note.create(note: 'Job Completed', job_id: 4, door_id: 6, admin_id: 2)
# Note.create(note: 'Additional Note for Job', job_id: 1, door_id: 4, admin_id: 1)
# Note.create(note: 'Door Looks Good', job_id: 5, door_id: 8, admin_id: 1)
# Note.create(note: 'Never Received Hardware', job_id: 5, door_id: 7, admin_id: 1)


# puts "Seeded 🌱"