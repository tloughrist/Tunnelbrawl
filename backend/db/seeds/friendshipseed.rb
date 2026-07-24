friendships = Friendship.create!([
  {friender_id: 1, friendee_id: 2, status: "active"},
  {friender_id: 1, friendee_id: 3, status: "active"},
  {friender_id: 4, friendee_id: 1, status: "active"},
  {friender_id: 4, friendee_id: 2, status: "active"},
  {friender_id: 3, friendee_id: 2, status: "active"},
  {friender_id: 5, friendee_id: 1, status: "active"},
  {friender_id: 6, friendee_id: 1, status: "active"},
  {friender_id: 4, friendee_id: 5, status: "active"},
  {friender_id: 4, friendee_id: 6, status: "active"},
  {friender_id: 2, friendee_id: 5, status: "active"},
  {friender_id: 3, friendee_id: 4, status: "active"},
  {friender_id: 3, friendee_id: 5, status: "active"},
])