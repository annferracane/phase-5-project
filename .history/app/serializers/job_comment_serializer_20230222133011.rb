class JobCommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :job_id, :comment
end
