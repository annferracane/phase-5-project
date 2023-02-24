class JobCommentSerializer < ActiveModel::Serializer
  attributes :id, :job_id, :comment
end
